import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import * as yup from "yup";
import Text from "./Text";

export const validationSchema = yup.object().shape({
  username: yup
    .string()
    .min(5, "Username must be at least 5 characters")
    .max(30, "Username must be at most 30 characters")
    .required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .max(50, "Password must be at most 50 characters")
    .required("Password is required"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Password confirmation is required"),
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
  },
});

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: { username: "", password: "", passwordConfirmation: "" },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Username"
        value={formik.values.username}
        onChangeText={formik.handleChange("username")}
        onBlur={formik.handleBlur("username")}
        style={styles.input}
      />
      {formik.touched.username && formik.errors.username && (
        <Text style={{ color: "red" }}>{formik.errors.username}</Text>
      )}
      <TextInput
        placeholder="Password"
        value={formik.values.password}
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        secureTextEntry
        style={styles.input}
      />
      {formik.touched.password && formik.errors.password && (
        <Text style={{ color: "red" }}>{formik.errors.password}</Text>
      )}
      <TextInput
        placeholder="Confirm Password"
        value={formik.values.passwordConfirmation}
        onChangeText={formik.handleChange("passwordConfirmation")}
        onBlur={formik.handleBlur("passwordConfirmation")}
        secureTextEntry
        style={styles.input}
      />
      {formik.touched.passwordConfirmation &&
        formik.errors.passwordConfirmation && (
          <Text style={{ color: "red" }}>
            {formik.errors.passwordConfirmation}
          </Text>
        )}
      <Pressable onPress={formik.handleSubmit} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Sign Up</Text>
      </Pressable>
    </View>
  );
};
