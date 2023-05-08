import React, { useRef, useState } from 'react';
import emailjs from 'emailjs-com';

const Form = () => {
  const form = useRef();
  const [buttonState, setButtonState] = useState('Send');
  const [buttonColor, setButtonColor] = useState('default');

  const sendEmail = (e) => {
    e.preventDefault();
    setButtonState('Sending...');
    setButtonColor('default');

    emailjs
      .sendForm('service_l83oewq', 'template_s98aedq', form.current, '7gWXP-x0bIE2F4Bkr')
      .then((result) => {
        console.log(result.text);
        setButtonState('Message Sended');
        setButtonColor('success');
        form.current.reset();
        setTimeout(() => {
          setButtonState('Send');
          setButtonColor('default');
        }, 2000);
      })
      .catch((error) => {
        console.log(error.text);
        setButtonState('Error: Try again later.');
        setButtonColor('error');
        setTimeout(() => {
          setButtonState('Send');
          setButtonColor('default');
        }, 2000);
      });
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <div className="field input-box">
              <label type="hidden" for="from_name"></label>
              <input type="text" name="from_name" id="from_name" placeholder="Name" required/>
            </div>
            <div className="field input-box">
              <label type="hidden" for="reply_to"></label>
              <input type="text" name="reply_to" id="reply_to" placeholder="Email" required/>
            </div>
            <div className="field">
              <input type="hidden" name="to_name" id="to_name" value="Marcos Freitas" required/>
            </div>
            <div className=" field input-box message-box">
              <label type="hidden" for="message"></label>
              <textarea className="input-box message-box" type="text" name="message" id="message" placeholder="Message"
                required></textarea>
            </div>
            <div className="button"/>
      <input id='buttonSubmit' type="submit" value={buttonState} className={`${buttonState.toLowerCase()} ${buttonColor}`} />
    </form>
  );
};

export default Form;