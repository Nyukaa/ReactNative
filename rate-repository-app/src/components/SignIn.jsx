import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import * as yup from "yup";
const validationSchema = yup.object().shape({
  username: yup.string().required("Username is required"),

  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
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
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

const SignIn = () => {
  const onSubmit = (values) => {
    console.log(values);
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema, // added validation schema
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")} // to trigger validation on blur
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry // hides the password input
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
