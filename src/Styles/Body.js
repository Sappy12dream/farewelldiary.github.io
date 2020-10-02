import React from 'react';
import img from '../Components/img.jpg';
import {Modal} from '@material-ui/core';
import {FaQuoteLeft} from 'react-icons/fa';
import {FiArrowLeftCircle} from 'react-icons/fi';
import {FiArrowRightCircle} from 'react-icons/fi';
import {MdAddCircleOutline} from 'react-icons/md';
import {MdClear} from 'react-icons/md';

function Body({
  handleNext,
  handleprev,
  isDisabled,
  isEnabled,
  modalIsopen,
  username,
  setusername,
  journey,
  setjourney,
  quote,
  setquote,
  setmodalIsopen,
  cardname,
  cardjourney,
  cardquote,
  saveData,
  progess,
  cardimage,
  image,
  setimage,
  length,
  user,
}) {
  const handleChange = (e) => {
    if (e.target.files[0]) {
      setimage(e.target.files[0]);
    }
  };
  return (
    <div className="body flex v-center center">
      <div className="body__container flex v-center center">
        <div className="col">
          <div className="img__container">
            <img src={cardimage} alt={`farewell-of-${user?.displayName}`} />
          </div>
          <div className="blog__links">
            <ul>
              <li>
                <a
                  href="https://sappy12dream.blogspot.com/2018/06/wh.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  What to do next ?
                </a>
              </li>
              <li>
                <a
                  href="https://sappy12dream.blogspot.com/2019/10/Why-should-not-give-up.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Why you shouldn't give up ?
                </a>
              </li>
              <li>
                <a
                  href="https://sappy12dream.blogspot.com/2019/10/smart-work-vs-hard-work-how-to-be-smart.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Why you should do smart work?
                </a>
              </li>
              <li>
                <a
                  href="https://sappy12dream.blogspot.com/2019/10/stars-behind-bars.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Why you shouldn't hide yourself?
                </a>
              </li>
              <li>
                <a
                  href="https://sappy12dream.blogspot.com/2019/09/being-20-years-old.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  What it's like to be a 20 years old?
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col2">
          <div className="content__container">
            <div className="quote__container flex">
              <div className="icon__container">
                <FaQuoteLeft className="icon" />
              </div>
              <div className="quote__body">
                <p>{cardquote}</p>
                <h3>- {cardname}</h3>
                <div className="line"></div>
              </div>
            </div>
            <div className="message__body">
              <p>{cardjourney}</p>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={handleprev}
        disabled={isEnabled}
        className="navigation-left navigation"
      >
        <FiArrowLeftCircle />
      </button>
      <button
        onClick={handleNext}
        disabled={isDisabled}
        className="navigation-right navigation"
      >
        <FiArrowRightCircle />
      </button>
      <button
        className="create flex v-center space-btw"
        onClick={() => setmodalIsopen(true)}
      >
        <MdAddCircleOutline className="icon" /> <span>Create</span>
      </button>
      <div className="post__count flex v-center center">
        <h2>posts:</h2>
        <p>{length}</p>
      </div>
      <Modal open={modalIsopen}>
        <div className="modal__container flex v-center center">
          <form className="modal flex v-center ">
            <h1>create new</h1>
            <div className="form-container">
              <div className="flex">
                <label>username:</label>
                <input
                  type="text"
                  placeholder="username..."
                  value={username}
                  onChange={(e) => setusername(e.target.value)}
                  required
                />
              </div>
              <div className="flex">
                <label>College Journey:</label>
                <textarea
                  type="text"
                  placeholder="Type about your journey so far... what you like or dislike.....What you are going to miss...."
                  rows="6"
                  cols="35"
                  required
                  value={journey}
                  onChange={(e) => setjourney(e.target.value)}
                ></textarea>
              </div>
              <div className="flex">
                <label>Quote:</label>
                <textarea
                  type="text"
                  placeholder="Message for your future self..."
                  required
                  value={quote}
                  onChange={(e) => setquote(e.target.value)}
                ></textarea>
              </div>
            </div>
            <progress value={progess} max="100" />
            <input type="file" required onChange={handleChange} />

            <button className="save-btn" onClick={saveData}>
              Save
            </button>

            <button onClick={() => setmodalIsopen(false)} className="clear-btn">
              <MdClear />
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
}

export default Body;
