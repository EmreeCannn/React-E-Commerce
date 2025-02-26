 import {   useEffect,  } from 'react';
// import {
//   onAuthStateChangedListener,
//   createUserDocumentFromAuth,
// } from '../utils/Firebase/Firebase.utils';

import { onAuthStateChangeListener,createUserDocumentFromAuth } from '../utils/Firebase/Firebase_utils';
import { useDispatch } from "react-redux";
import { updateUser } from '../Redux/Slices/UserSlice';
// export const UserContext = createContext({
//   setCurrentUser: () => null,
//   currentUser: null,
// });

// const userReducer = (state,action) =>{
//   // buradaki state değeri benim aşşağıda tanımladığım  INITIAL_STATE dir
//   //  action değeri olan type ve payload payload opsiyonel istediğin ismi verebilirisn genelellikle payload da data tutulur
//   // dispach ile  vereceğim değerlerdir 
//   switch(action.type){
//     case "SET_CURRENT_USER":
//       return {
//         ...state,
//         //  burada demek istediğim benim INITIAL_STATE içinde bu durumda değil farklı durumlarda birden fazla 
//         // değer olabilir  bu yüzden diğer değerleri değiştirmeden  ban getir sadece manipule etmek istediğim değere yeni
//         //  değerini setle diyorum 
//         currentUser:action.payload
//       }
//     default:
//       // eğer  swich içerisinde belirttiğim action.type  case e karşılık gelen değerleri içermıyorsa  default kısmı çalışır
//       throw new Error(`Unhandled type ${action.type} in userReducer `)

//   }
// }
// const INITIAL_STATE = {
//   currentUser: null
// }

// eslint-disable-next-line react/prop-types
export const UserProvider = () => {

  console.log("component render oldu")
  // const [currentUser, setCurrentUser] = useState(null);
   

  // const [state,dispatch] = useReducer(userReducer,INITIAL_STATE)
  // //  burada yer alan state değerim initial statin en güncel değeridir 
  // const value = { state };

  // console.log(state);
  

  //  use effect sayfam render edildikten sonra çalışır bunu unutma 

  //  use effectim benim componentim ilk kez domda göründünde çalıcıcak 
  // setCurrentUser ile sayfamı render etsem bile use effectim calısmıycak
  const dispatch = useDispatch();
  useEffect(() => {
     const unsubscribe = onAuthStateChangeListener((user) => {
       console.log("burası calısştı",user);
        
         const {displayName} = user
      dispatch(updateUser(displayName))
      //  dispatch({type:"SET_CURRENT_USER",payload:user})
      //  setCurrentUser(user);
      if (user) {
        createUserDocumentFromAuth(user);
      }
    })
    //  kullanıcım giriş yaptı ya da çıkış yaptı bu bilgileri edindikten sonra benim o kullanıcıyı 
    // takip edip izlememe gerek yok o yuzden return kısmına unsubscribe yazarak izlemeyi bırakıyorum 
    //  componentin domdan çıkarılınca  return içindeki kısım çalışır 
    return ()=> {
      unsubscribe
      console.log("unmount");
    }
  },[]);

  // return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};



