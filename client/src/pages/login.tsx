import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { loginSchema, type LoginFormData } from '../schemas/auth';
import { Link } from 'react-router';
import CLIENT_ROUTES from '../constants/client-routes';
import useLogin from '../hooks/use-login';

const Login = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate: login, isPending } = useLogin(setError);

  const onSubmit = async (data: LoginFormData) => {
    login(data);
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '450px' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Login</h2>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="loginEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                autoComplete="email"
                isInvalid={!!errors.email}
                {...register('email')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="loginPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter your password"
                autoComplete="current-password"
                isInvalid={!!errors.password}
                {...register('password')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {errors.root?.server && (
              <p className="text-danger">{errors.root.server.message}</p>
            )}

            <Button
              type="submit"
              variant="primary"
              className="w-100 d-flex justify-content-center align-items-center gap-1"
              disabled={isPending}
            >
              {isPending && (
                <Spinner
                  size="sm"
                  className="border-2"
                  animation="border"
                  role="status"
                />
              )}
              Login
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            Don't have an account?{' '}
            <Link to={CLIENT_ROUTES.signup}>Sign up</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
