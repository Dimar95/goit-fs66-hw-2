import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { object, string } from "yup";

const LoginScreen = ({ setLogin }) => {
  const [showPass, setShowPass] = useState(true);
  const userSchema = object({
    name: string()
      .required("Обязательное поле")
      .min(3, "Не менее 3-ти символов"),
    email: string()
      .email("Invalid Email")
      .min(6, "Не менее 6-ти символов")
      .required("Обязательное поле"),
    password: string()
      .required("Обязательное поле")
      .min(6, "Не менее 6-ти символов"),
  });

  const onSubmit = ({ email, password }) => {
    Keyboard.dismiss();
    console.log(`E-mail: ${email} Password: ${password}`);
  };

  const onShowPass = () => {
    setShowPass(false);
    setTimeout(() => {
      console.log("ddd");
      setShowPass(true);
    }, 1000);
  };
  useEffect(() => {}, []);
  return (
    <KeyboardAvoidingView
      style={styles.containerKeyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
        }}
      >
        <View style={styles.formContainer}>
          <Text style={styles.h1}>Войти</Text>
          <Formik
            onSubmit={(values, action) => {
              onSubmit(values);
              action.resetForm();
            }}
            validationSchema={userSchema}
            initialValues={{ email: "", password: "" }}
          >
            {({ values, errors, handleChange, handleSubmit }) => {
              return (
                <View>
                  <TextInput
                    value={values.email}
                    onChangeText={handleChange("email")}
                    placeholder="Адрес электронной почты"
                    style={styles.input}
                  />
                  {errors.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                  <View>
                    <TextInput
                      value={values.password}
                      onChangeText={handleChange("password")}
                      placeholder="Пароль"
                      style={styles.input}
                      secureTextEntry={showPass}
                    />
                    {errors.password && (
                      <Text style={styles.errorText}>{errors.password}</Text>
                    )}
                    <TouchableOpacity
                      style={styles.openPass}
                      onPress={onShowPass}
                    >
                      {values.password !== "" && (
                        <Text style={styles.showPassText}>Показать</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    style={styles.button}
                    activeOpacity={0.8}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.buttonText}>Войти</Text>
                  </TouchableOpacity>
                </View>
              );
            }}
          </Formik>
          <TouchableOpacity
            style={styles.login}
            activeOpacity={0.8}
            onPress={() => {
              setLogin(false);
            }}
          >
            <Text style={styles.login}>Нет аккаунта? Зарегистрироваться</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  containerKeyboardAvoidingView: {
    justifyContent: "flex-end",
  },
  h1: {
    fontWeight: 500,
    fontFamily: "Roboto-Bold",
    fontSize: 30,
    lineHeight: 35,
    textAlign: "center",
    letterSpacing: 0.01,
    color: "#212121",
    marginTop: 92,
    // marginBottom: 32,
  },
  input: {
    marginHorizontal: 32,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    marginTop: 16,
    fontSize: 16,
    lineHeight: 19,
    color: "#212121",
    padding: 16,
  },
  inputActiv: {
    borderColor: "#FF6C00",
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginHorizontal: 32,
    marginBottom: 16,
    paddingHorizontal: 32,
    paddingVertical: 16,
    marginTop: 43,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  login: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    alignItems: "center",
    marginBottom: 45,
  },

  openPass: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
    position: "absolute",
    top: 36,
    left: 270,
  },
  showPassText: {
    color: "#1B4371",
    fontFamily: "Roboto-Regulat",
    fontSize: 16,
    lineHeight: 19,
  },
  errorText: {
    color: "#ff0000",
    textAlign: "center",
    marginTop: 4,
  },
});

export default LoginScreen;
