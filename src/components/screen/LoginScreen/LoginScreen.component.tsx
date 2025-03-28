import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from './LoginScreen.style';
import {LoginScreenProps} from './LoginScreen.type';
import {Text, Input, Button} from '../../../components/atom';

// Form doğrulama şeması
const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi gereklidir'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre gereklidir'),
});

export const LoginScreen: React.FC<LoginScreenProps> = ({onLogin, onSignUpPress}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values: {email: string; password: string}) => {
    try {
      setIsLoading(true);
      // Gerçek uygulamada burada API isteği yapılır
      // Şimdilik mock veri kullanıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API isteği
      onLogin(values.email, values.password);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.headerContainer}>
          <Text size="xxxl" weight="bold" color="primary" style={styles.title}>
            Hoş Geldiniz
          </Text>
          <Text size="s" color="light" style={styles.subtitle}>
            Film ve dizileri takip etmek için giriş yapın
          </Text>
        </View>

        <Formik
          initialValues={{email: '', password: ''}}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => (
            <View style={styles.formContainer}>
              <Input
                label="E-posta"
                placeholder="E-posta adresinizi giriniz"
                value={values.email}
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                error={touched.email && errors.email ? errors.email : undefined}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <Input
                label="Şifre"
                placeholder="Şifrenizi giriniz"
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                error={touched.password && errors.password ? errors.password : undefined}
                secureTextEntry={true}
              />

              <TouchableOpacity
                style={styles.forgotPasswordContainer}
                onPress={() => console.log('Şifremi unuttum')}
              >
                <Text size="s" color="primary">
                  Şifremi Unuttum
                </Text>
              </TouchableOpacity>

              <Button
                title="Giriş Yap"
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                loading={isLoading}
                style={styles.loginButton}
                size="large"
                variant="primary"
              />
            </View>
          )}
        </Formik>

        <View style={styles.footerContainer}>
          <Text size="s" color="light">
            Hesabınız yok mu?
          </Text>
          <TouchableOpacity onPress={onSignUpPress}>
            <Text size="s" color="primary" style={styles.signUpText}>
              Kayıt Ol
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
