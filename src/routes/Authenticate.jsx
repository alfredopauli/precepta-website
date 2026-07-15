import Header from '../components/Header';
import SignInForm from '../components/SignInForm';


const Authenticate = () => {
  return (
    <>
      <Header />
      <div className="authenticate-wrapper">
        <SignInForm />
      </div>
    </>
  );
}


export default Authenticate;

