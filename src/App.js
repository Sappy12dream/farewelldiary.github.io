import React, {useState, useEffect} from 'react';
import {auth, provider, db, storage} from './Firebase';
import firebase from 'firebase';
import './Styles/App.scss';
import Login from './Components/Login';
import Header from './Components/Header';
import Body from './Styles/Body';

function App() {
  const [user, setuser] = useState(null);
  const [email, setemail] = useState('');
  const [password, setpassword] = useState('');
  const [emailError, setemailError] = useState('');
  const [passwordError, setpasswordError] = useState('');
  const [hasAaccount, sethasAaccount] = useState(false);

  // card
  const [modalIsopen, setmodalIsopen] = useState(false);
  const [index, setindex] = useState(0);
  const [data, setdata] = useState(['']);
  const [username, setusername] = useState('');
  const [journey, setjourney] = useState('');
  const [image, setimage] = useState('');
  const [quote, setquote] = useState('');
  const [progess, setprogess] = useState(0);
  const [length, setlength] = useState('');

  useEffect(() => {
    db.collection('data')
      .orderBy('timestamp', 'desc')
      .onSnapshot((snapshot) => {
        setdata(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);
  useEffect(() => {
    setlength(data.length);
  }, [data]);

  const isEnabled = index === 0 || index === -1;
  const isDisabled = index === data.length - 1;

  function handleNext(e) {
    e.preventDefault();
    setindex(index + 1);
  }
  function handleprev(e) {
    e.preventDefault();
    setindex(index - 1);
  }

  const card1 = data[index];

  const saveData = (e) => {
    e.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setprogess(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        storage
          .ref('images/')
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            db.collection('data').add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp(),
              username: username,
              journey: journey,
              quote: quote,
              imageUrl: url,
            });
            setprogess(0);
            setusername('');
            setjourney('');
            setquote('');
            setimage('');
            setmodalIsopen(false);
            setindex(0);
          });
      }
    );
  };

  const clearInput = () => {
    setemail('');
    setpassword('');
  };

  const clearError = () => {
    setpasswordError('');
    setemailError('');
  };

  const googleLogin = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          setuser(result.user);
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    clearError();
    auth.signInWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case 'auth/invalide-email':
        case 'auth/user-disabled':
        case 'auth/user-not-found':
          setemailError(err.message);
          break;
        case 'auth/wrong-password':
          setpasswordError(err.message);
          break;
      }
    });
  };
  const handleSignup = (e) => {
    e.preventDefault();
    clearError();
    auth.createUserWithEmailAndPassword(email, password).catch((err) => {
      switch (err.code) {
        case 'auth/email-already-in-use':
        case 'auth/invalid-email':
          setemailError(err.message);
          break;
        case 'auth/weak-password':
          setpasswordError(err.message);
          break;
      }
    });
  };

  const handleLogout = () => {
    auth.signOut();
  };

  const authListener = () => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        clearInput();
        setuser(user);
        console.log(user)
        console.log(user.photoURL)
      } else {
        setuser('');
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);
  return (
    <div className="App">
      {user ? (
        <>
          <Header
            handleLogout={handleLogout}
            username={user.displayName}
            userPhoto={user.photoURL}
          />
          <Body
            handleprev={handleprev}
            handleNext={handleNext}
            isDisabled={isDisabled}
            isEnabled={isEnabled}
            modalIsopen={modalIsopen}
            username={username}
            setusername={setusername}
            journey={journey}
            setjourney={setjourney}
            quote={quote}
            setquote={setquote}
            setmodalIsopen={setmodalIsopen}
            cardname={card1.username}
            cardjourney={card1.journey}
            cardquote={card1.quote}
            cardimage={card1.imageUrl}
            saveData={saveData}
            length={length}
            progess={progess}
            image={image}
            setimage={setimage}
            user={user}
          />
        </>
      ) : (
        <Login
          email={email}
          setemail={setemail}
          password={password}
          setpassword={setpassword}
          handleLogin={handleLogin}
          handleSignup={handleSignup}
          hasAaccount={hasAaccount}
          sethasAaccount={sethasAaccount}
          emailError={emailError}
          passwordError={passwordError}
          googleLogin={googleLogin}
        />
      )}
    </div>
  );
}

export default App;
