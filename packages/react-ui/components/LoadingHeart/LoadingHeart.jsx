import './LoadingHeart.css';

export const LoadingHeart = ({ message }) => (
  <>
    <div className='lds-heart'>
      <div></div>
    </div>
    <p className='lds-heart-message'>{message}</p>
  </>
);