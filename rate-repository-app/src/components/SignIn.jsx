import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import * as yup from "yup";
import { useState, useEffect } from "react";

import useSignIn from "../hooks/useSignIn";
import AuthStorage from "../utils/authStorage";

const authStorage = new AuthStorage();

const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

const styles = StyleSheet.create({
  container: { padding: 20 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginBottom: 10,
    borderRadius: 4,
  },
  button: {
    backgroundColor: "#0366d6",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});

const SignIn = () => {
  const [signIn] = useSignIn();
  const [userToken, setUserToken] = useState(null);
  // проверяем токен при загрузке компонента
  useEffect(() => {
    const loadToken = async () => {
      const token = await authStorage.getAccessToken();
      if (token) setUserToken(token);
    };
    loadToken();
  }, []);

  const onSubmit = async (values) => {
    try {
      const data = await signIn(values);
      const token = data.authenticate.accessToken;

      // сохраняем токен
      await authStorage.setAccessToken(token);
      setUserToken(token); // обновляем состояние

      console.log("User signed in, token saved:", token);
    } catch (e) {
      console.error("Sign in failed:", e);
    }
  };

  const handleSignOut = async () => {
    await authStorage.removeAccessToken();
    setUserToken(null); // обновляем UI
    console.log("User signed out");
  };

  const formik = useFormik({
    initialValues: { username: "", password: "" },
    validationSchema,
    onSubmit,
  });

  // если пользователь вошёл
  if (userToken) {
    return (
      <View style={styles.container}>
        <Text>Вы вошли в систему!</Text>
        <Pressable style={styles.button} onPress={handleSignOut}>
          <Text style={styles.buttonText}>Sign Out</Text>
        </Pressable>
      </View>
    );
  }

  // если пользователь не вошёл — показываем форму
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={styles.buttonText}>Sign in</Text>
      </Pressable>
    </View>
  );
};

export default SignIn;
