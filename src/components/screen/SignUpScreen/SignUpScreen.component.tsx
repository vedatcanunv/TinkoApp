import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform} from 'react-native';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {styles} from './SignUpScreen.style';
import {SignUpScreenProps} from './SignUpScreen.type';
import {Text, Input, Button} from '../../../components/atom';

// Form doğrulama şeması
const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required('Ad gereklidir'),
  lastName: Yup.string().required('Soyad gereklidir'),
  email: Yup.string()
    .email('Geçerli bir e-posta adresi giriniz')
    .required('E-posta adresi gereklidir'),
  password: Yup.string().min(6, 'Şifre en az 6 karakter olmalıdır').required('Şifre gereklidir'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Şifreler eşleşmiyor')
    .required('Şifre onayı gereklidir'),
});

export const SignUpScreen: React.FC<SignUpScreenProps> = ({onSignUp, onLoginPress}) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (values: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) => {
    try {
      setIsLoading(true);
      // Gerçek uygulamada burada API isteği yapılır
      // Şimdilik mock veri kullanıyoruz
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simüle edilmiş API isteği
      onSignUp(`${values.firstName} ${values.lastName}`, values.email, values.password);
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
            Hesap Oluştur
          </Text>
          <Text size="s" color="light" style={styles.subtitle}>
            Film ve dizileri takip etmek için hesap oluşturun
          </Text>
        </View>

        <Formik
          initialValues={{
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
          }}
          validationSchema={SignUpSchema}
          onSubmit={handleSignUp}
        >
          {({handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting}) => (
            <View style={styles.formContainer}>
              <Input
                label="Ad"
                placeholder="Adınızı giriniz"
                value={values.firstName}
                onChangeText={handleChange('firstName')}
                onBlur={handleBlur('firstName')}
                error={touched.firstName && errors.firstName ? errors.firstName : undefined}
                autoCapitalize="words"
              />

              <Input
                label="Soyad"
                placeholder="Soyadınızı giriniz"
                value={values.lastName}
                onChangeText={handleChange('lastName')}
                onBlur={handleBlur('lastName')}
                error={touched.lastName && errors.lastName ? errors.lastName : undefined}
                autoCapitalize="words"
              />

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

              <Input
                label="Şifre Onayı"
                placeholder="Şifrenizi tekrar giriniz"
                value={values.confirmPassword}
                onChangeText={handleChange('confirmPassword')}
                onBlur={handleBlur('confirmPassword')}
                error={
                  touched.confirmPassword && errors.confirmPassword
                    ? errors.confirmPassword
                    : undefined
                }
                secureTextEntry={true}
              />

              <Button
                title="Kayıt Ol"
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
                loading={isLoading}
                style={styles.signUpButton}
                size="large"
                variant="primary"
              />
            </View>
          )}
        </Formik>

        <View style={styles.footerContainer}>
          <Text size="s" color="light">
            Zaten hesabınız var mı?
          </Text>
          <TouchableOpacity onPress={onLoginPress}>
            <Text size="s" color="primary" style={styles.loginText}>
              Giriş Yap
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
