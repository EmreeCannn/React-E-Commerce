import {initializeApp} from "firebase/app"
import {getAuth,signInWithPopup,GoogleAuthProvider,createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut,sendEmailVerification, onAuthStateChanged} from "firebase/auth"
import { getFirestore,doc, getDoc ,setDoc,collection, writeBatch ,query ,getDocs,} from "firebase/firestore"

//  getFirestore ile veritabanımız kuruyoruz
//  doc sayesinde firebase veritabanım ile iletişim kurabilirm bu yüzden  doc nesnesinden bir sınıf oluşturup
//  tanımladığım değişkene atamam lazım 
//  getDoc ile veritabanı içindeki verilerimi alabilrim 
//  setDoc ile veritabanıma veri ekleyeblirim 



// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCef-RVUnW3Vl6b09NfJ2eXO0LkMRTXQBw",
    authDomain: "e-commerce-db-dbdcd.firebaseapp.com",
    projectId: "e-commerce-db-dbdcd",
    storageBucket: "e-commerce-db-dbdcd.appspot.com",
    messagingSenderId: "47992251910",
    appId: "1:47992251910:web:08f19fb38714cfd2bfc587"
  };
  
  // Initialize Firebase
 initializeApp(firebaseConfig);
  
  const provider = new GoogleAuthProvider();
//   google ile doğrulama yapabilmek için   provider initialize yapmamız gerek

// ne zaman kullanıcı provider ile etkileşime geçerse onları acoount seçmeleri içi zorluycaz
//  setCustomParameters in amacı google ile doğrulama yapmak için kullanılır
// provider.setCustomParameters({
//     promt:"select_account"
// });

export const auth = getAuth();

// auth.useDeviceLanguage();

export const  SignInWithGooglePopUp = () => signInWithPopup(auth,provider);




export const db =getFirestore();
//  artık db değişkenim  direkt olarak benim veritabanımı temsil etmektedir

export const  addCollectionAndDocument = async (CollectionKey,documentsToAdd) =>{
  // async kullanıcam çünkü verilerimi depolamak için bir api ya istek atacağım 

  const colletionRef = collection(db,CollectionKey);
  const batch = writeBatch(db);
  // writeBatch içine hangi veri tabanımla çalışacağını söylüyorum içibne db yazarak

  documentsToAdd.forEach(object=>{
    const docRef = doc(colletionRef, object.title.toLowerCase());
    //  categories altındaki hats documanımı işaret edecek sonra jacket sonra mens diye gidecek 
    // object.title.toLowerCase() benim key değerimi temsil eder object yani (items) ise value değerimi
    // her bir title unique olduğu için title verdim 
    //  burda demek istediğiö veritabanım içinde collectionRef yani categories altındaki title i bla bla olan documanımı ver
    batch.set(docRef,object)
  })

  await batch.commit();
  //  burada veri tabanı işlemlerimi başlatıyorum 
  console.log("done");

  // writeBatch Firebase'in Firestore veritabanında birden fazla işlem yapmayı
  //  ve bu işlemleri toplu olarak gerçekleştirmeyi sağlayan bir yöntemdir. 
  // Bu, birden fazla okuma/yazma işlemini tek bir işlemde birleştirerek atomik
  //  bir şekilde gerçekleştirilmesini sağlar.
  //  Atomik işlem şu anlama gelir: Eğer toplu işlemdeki herhangi bir adım başarısız olursa,
  //  tüm işlemler geri alınır ve Firestore veritabanı, değişiklik yapılmamış gibi orijinal durumuna döner.
  //  Bu, veritabanının tutarlılığını korumak için oldukça önemlidir.
}
export const getCategoriesAndDocuments = async () =>{
  const collectionRef = collection(db,"categories");

  const q = query(collectionRef);
  // query içidenki parametrede collectionRef Sorgunun uygulanacağı koleksiyonumdur 

  const querySnapShot = await getDocs(q);
 
  console.log(querySnapShot.docs);
  // documanlarımın tutulduğıu yer  querySnapShot.docs burasıdır 
    // .docs, Firestore sorgusundan dönen veriler üzerinde toplu işlemler yapmayı kolaylaştırır.
    //  Sorgunun tüm sonuçlarını bir dizi olarak verir ve bu sayede diziyi dolaşıp işlemler yapabilirsiniz.
  const categoryMap = querySnapShot.docs.reduce((acc,document)=>{
    console.log(document.data());
    const {title,items} = document.data();
    acc[title.toLowerCase()] = items
    return acc
  },{})
  // console.log(categoryMap);
  return categoryMap



  // Bir koleksiyonun tüm verilerini almak için getDocs kullanırlır 

  // getDocs, bir query veya bir koleksiyon referansından verileri çeker. Bu nedenle query ile birlikte kullanıldığında, sorgu sonucunda dönen dokümanları alabilirsiniz.




  // Firebase Firestore'daki query, veritabanındaki verileri belirli kriterlere göre filtrelemek,
  //  sıralamak veya sınırlamak için kullanılan bir mekanizmadır.
  //  Firestore'un koleksiyon bazlı yapısında, bir koleksiyon içindeki dokümanları almak için genellikle query kullanılır.
}

 export const createUserDocumentFromAuth = async (userAuth,additonalinfo = {}) =>{

  const userDocRef = doc(db,"users",userAuth.uid)
  //  doc database altındaki user collaction altındaki spesifik documanı işaret ediyor burda 

  //   uid kullanmamım sebesi her dökümanın eşşiz olmasından dolayıdır
  //  burada demek istediğim hey bana db databasenina içindeki userların altındaki uid si bu olan doc referansını ver
  // console.log(userDocRef);
  
  const user_snapshot = await getDoc(userDocRef);
  // console.log(user_snapshot);
  // peki bu verimin veri tabanında olup olmadığını nasıl kontrol ederim 
  // console.log(user_snapshot.exists());

  if(!user_snapshot.exists()){
    //?  eğer veri tabanında verim yoksa burası bana true döner ! ile tersini aldım 
    const {displayName, email,photoURL} = userAuth
    const create_date = new Date();
    //  date sayesinde kullanıcın ne zaman giriş yaptığını yakalayabilicem 

    try{
      await setDoc(userDocRef,{
        //  burada setlemek istediğimiz nedir onları yazıcaz
        displayName,
        email,
        create_date,
        photoURL,
        ...additonalinfo
      });
    }catch(err){
      alert("error mesage", err.message);
    }
  }
  return userDocRef;
  // eğer verim veritabında kayıtlıysa direkt bana o veriyi dön diyorum 

}

export const createAuthUserWithEmailAndPassword = async (email,password)=>{
  if(!email || ! password) return;

   return  createUserWithEmailAndPassword(auth,email,password);

}
export const SignInUserWithEmailAndPassword = async (email,password) =>{
  if(!email || ! password) return;
  
  return signInWithEmailAndPassword(auth,email,password);
} 


export const  SignOutUser = async () =>{
  await signOut(auth);
}

export const onAuthStateChangeListener = (callback) =>{
  onAuthStateChanged(auth,callback);
  //  auth statim her değiştiğinde bu callback tetiklenicek 
}

export const SendUserEmailVerification = (user_info)=>{

   return sendEmailVerification(user_info);
 }

