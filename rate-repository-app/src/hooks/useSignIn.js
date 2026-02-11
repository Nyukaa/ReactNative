//hook for signing in a user, using the AUTHENTICATE mutation to get an access token
//Хук useSignIn отправляет GraphQL мутацию и возвращает данные, включая accessToken.
import { useMutation } from "@apollo/client";
import { AUTHENTICATE } from "../graphql/mutations"; // твоя мутация authenticate

const useSignIn = () => {
  const [mutate, result] = useMutation(AUTHENTICATE);

  const signIn = async ({ username, password }) => {
    const { data } = await mutate({
      variables: {
        credentials: { username, password },
      },
    });
    return data;
  };

  return [signIn, result];
};

export default useSignIn;
