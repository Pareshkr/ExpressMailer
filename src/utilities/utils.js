import { auth, db } from "../firebase"
import { generateRoomName } from "./common"
import { decrypt } from "./crypt"

export function getQueryStatement(selectedSideBarItem,selectedLabelItem){
    let emailRef = db.collection('emails')

    // Left side bar
    if(selectedSideBarItem == 0){// received
      emailRef = emailRef.where('to','==',auth.currentUser.email)
    }
    else if(selectedSideBarItem == 1){ // starred
      emailRef = emailRef.where('to','==',auth.currentUser.email).where('starred','==',true)
    }
    else if(selectedSideBarItem == 3){ // marked as imp
      console.log('imp here')
      emailRef = emailRef.where('to','==',auth.currentUser.email).where('important','==',true)
    }
    else if(selectedSideBarItem == 4){// sent by me
      console.log('sentttt by meee')
      emailRef = emailRef.where('from','==',auth.currentUser.email)
    }

    // Label
    if(selectedLabelItem == 0){
      console.log('0 called')
      emailRef = emailRef.where('label','==',"Primary")
    }
    else if(selectedLabelItem == 1){
      console.log('1 called')
      emailRef = emailRef.where('label','==',"Social")
    }
    else if(selectedLabelItem == 2){
      console.log('2 called')
      emailRef = emailRef.where('label','==',"Promotions")
    }


    emailRef = emailRef.orderBy('timestamp','desc')
    
    return emailRef
}

export function processMailData(doc){
    return {
        id: doc.id,
        data: {
          ...doc.data(),
          subject: decrypt(
            doc.data().subject,
            generateRoomName(doc.data().to, doc.data().from)
          ),
          message: decrypt(
            doc.data().message,
            generateRoomName(doc.data().to, doc.data().from)
          )
        }, 
    }
}

export async function toggleStarred(id){
  var current= await db.collection('emails').doc(id).get()
  if(current.data().from == auth.currentUser.email){
    // user trying to star mail sent by self => DENY
    return 
  }
  db.collection('emails').doc(id).set({
      "starred": !current.data()["starred"]
    },{merge:true})
}

export async function toggleImportant(id){
  var current= await db.collection('emails').doc(id).get()
  if(current.data().from == auth.currentUser.email){
    // user trying to imp mail sent by self => DENY
    console.log('action deny')
    return 
  }
  db.collection('emails').doc(id).set({
      "important": !current.data()["important"]
    },{merge:true})
}