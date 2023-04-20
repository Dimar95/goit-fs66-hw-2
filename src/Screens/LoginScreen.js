import { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  Keyboard,
  Platform,
  Alert,
  TouchableOpacity,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";

const LoginScreen = ({ setLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(true);

  const emailHandler = (text) => setEmail(text);
  const passwordHandler = (text) => setPassword(text);

  const onSubmit = () => {
    if (email === "") {
      Alert.alert("Введите email");
      return;
    } else if (password === "") {
      Alert.alert("Придумайте надёжный пароль");
      return;
    } else {
      console.log(`E-mail: ${email} Password: ${password}`);
      resetInput();
    }
  };
  const resetInput = () => {
    setEmail("");
    setPassword("");
  };
  const onShowPass = () => {
    setShowPass(false);
    setTimeout(() => {
      setShowPass(true);
    }, 1000);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <View style={styles.formContainer}>
          <Text style={styles.h1}>Войти</Text>

          <TextInput
            value={email}
            onChangeText={emailHandler}
            placeholder="Адрес электронной почты"
            style={styles.input}
          />
          <View>
            <TextInput
              value={password}
              onChangeText={passwordHandler}
              placeholder="Пароль"
              style={styles.input}
              secureTextEntry={showPass}
            />
            <TouchableOpacity style={styles.openPass} onPress={onShowPass}>
              <Text style={styles.showPassText}>Показать</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.8}
            onPress={() => {
              Keyboard.dismiss();
              onSubmit();
            }}
          >
            <Text style={styles.buttonText}>Войти</Text>
          </TouchableOpacity>
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
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: "#fff",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
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
});

export default LoginScreen;
