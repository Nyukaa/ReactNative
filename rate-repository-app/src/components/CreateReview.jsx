import { View, TextInput, Pressable, StyleSheet } from "react-native";
import { useFormik } from "formik";
import Text from "./Text";
import { useMutation } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import { useNavigate } from "react-router-native";
//import { reviewValidationSchema } from "../utils/validation";
import * as yup from "yup";
const reviewValidationSchema = yup.object().shape({
  ownerName: yup.string().required("Repository owner's username is required"),
  repositoryName: yup.string().required("Repository's name is required"),
  rating: yup
    .number()
    .required("Rating is required")
    .min(0, "Rating must be between 0 and 100")
    .max(100, "Rating must be between 0 and 100"),
  text: yup.string(),
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
});

const CreateReview = () => {
  const navigate = useNavigate();
  const [createReview] = useMutation(CREATE_REVIEW);

  const formik = useFormik({
    initialValues: {
      ownerName: "",
      repositoryName: "",
      rating: "",
      text: "",
    },
    validationSchema: reviewValidationSchema,
    onSubmit: async (values) => {
      try {
        const ratingInt = parseInt(values.rating, 10); // rating должен быть числом
        const { data } = await createReview({
          variables: { ...values, rating: ratingInt },
        });
        navigate(`/repository/${data.createReview.repositoryId}`);
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Repository owner's username"
        value={formik.values.ownerName}
        onChangeText={formik.handleChange("ownerName")}
        onBlur={formik.handleBlur("ownerName")}
      />
      {formik.touched.ownerName && formik.errors.ownerName && (
        <Text style={{ color: "red" }}>{formik.errors.ownerName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Repository's name"
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange("repositoryName")}
        onBlur={formik.handleBlur("repositoryName")}
      />
      {formik.touched.repositoryName && formik.errors.repositoryName && (
        <Text style={{ color: "red" }}>{formik.errors.repositoryName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Rating (0-100)"
        value={formik.values.rating}
        keyboardType="numeric"
        onChangeText={formik.handleChange("rating")}
        onBlur={formik.handleBlur("rating")}
      />
      {formik.touched.rating && formik.errors.rating && (
        <Text style={{ color: "red" }}>{formik.errors.rating}</Text>
      )}

      <TextInput
        style={[styles.input, { height: 100 }]}
        placeholder="Review (optional)"
        value={formik.values.text}
        onChangeText={formik.handleChange("text")}
        multiline
      />

      <Pressable style={styles.button} onPress={formik.handleSubmit}>
        <Text style={{ color: "white", fontWeight: "bold" }}>
          Create Review
        </Text>
      </Pressable>
    </View>
  );
};

export default CreateReview;
