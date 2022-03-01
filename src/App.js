import './App.css';
import UserDetails from './components/UserDetails';
import { useState, useEffect } from 'react'
import { db, auth } from './firebase-config.js'
import { collection, getDocs, addDoc, updateDoc, doc, deleteDoc } from 'firebase/firestore'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth"

function App() {
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [newName, setNewName] = useState("")
  const [newAge, setNewAge] = useState(0)
  const [usersInDb, setUsersInDb] = useState([]);
  const usersCollectionRef = collection(db, 'users')

  const createUserInDb = async () => {
    await addDoc(usersCollectionRef, {name:newName, age: Number(newAge)})
  }  
  const updateUserInDb = async (id, age) => {
    const userDoc = doc(db,"users", id)
    const newFields = {age: age + 1}
    await updateDoc(userDoc, newFields)
  }
  
  const deleteUserInDb = async (id) => {
    const userDoc = doc(db,"users", id)
    await deleteDoc(userDoc)
  }
  
  useEffect(() => {
    const getUsersInDb = async () => {
    const data = await getDocs(usersCollectionRef)
    console.log(data)
    setUsersInDb(data.docs.map((doc) =>({...doc.data(), id: doc.id })))}
        
    getUsersInDb()
  }, [])
  
  const [user, setUser] = useState({});

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        registerEmail,
        registerPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      console.log(user);
    } catch (error) {
      console.log(error.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };



  return (
    <div className="App">
      <div>
        <h2> Login </h2>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setLoginEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setLoginPassword(event.target.value);
          }}
        />
        <button onClick={login}> Login</button>
      </div>
      <div>
        <h2> Register User </h2>
        <input
          placeholder="Email..."
          onChange={(event) => {
            setRegisterEmail(event.target.value);
          }}
        />
        <input
          placeholder="Password..."
          onChange={(event) => {
            setRegisterPassword(event.target.value);
          }}
        />

        <button onClick={register}> Create User</button>
      </div>
      <button onClick={logout}> Sign Out </button>
      <div><UserDetails user={user} /></div>

      <div>
        <h2>CRUD functions below!</h2>
        <input placeholder="Name..." onChange={(event) => {setNewName(event.target.value)}}/>
        <input type= "number" placeholder="Age..." onChange={(event) => {setNewAge(event.target.value)}}/>
        <button onClick={createUserInDb}> Create User </button>
        {usersInDb.map((userdb) => { return (<div>
          <h3> Name: {userdb.name}</h3>
          <h3>Age: {userdb.age}</h3>
          <button onClick={() => {updateUserInDb(userdb.id, userdb.age)}}>Increase Age</button>
          <button onClick={() => {deleteUserInDb(userdb.id)}}>Delete User</button>
          </div>)
        })}
      </div>
    </div>
  );
}

export default App