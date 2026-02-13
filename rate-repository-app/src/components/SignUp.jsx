import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-native";
import useSignIn from "../hooks/useSignIn";
import { CREATE_USER } from "../graphql/mutations";
import { SignUpContainer } from "../components/SignUpContainer";

const SignUp = () => {
  const [createUser] = useMutation(CREATE_USER);
  const [signIn] = useSignIn();
  const navigate = useNavigate();

  const onSubmit = async (values) => {
    //console.log("Submitted values:", values);
    try {
      const { username, password } = values;
      await createUser({ variables: { username, password } });
      await signIn({ username, password });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
