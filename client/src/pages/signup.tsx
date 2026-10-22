import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Card, Container, Form, Spinner } from 'react-bootstrap';
import { signupSchema, type SignupFormData } from '../schemas/auth';
import { Link } from 'react-router';
import CLIENT_ROUTES from '../constants/client-routes';
import useSignup from '../hooks/use-signup';

const Signup = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate: signup, isPending } = useSignup(setError);

  const onSubmit = async (data: SignupFormData) => {
    const { confirmPassword: _, ...signupData } = data;
    signup(signupData);
  };

  return (
    <Container className="py-5">
      <Card className="mx-auto shadow-sm" style={{ maxWidth: '450px' }}>
        <Card.Body className="p-4">
          <h2 className="text-center mb-4">Create an account</h2>

          <Form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Form.Group className="mb-3" controlId="signupEmail">
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

            <div className="d-flex gap-3 mb-3">
              <Form.Group controlId="signupFirstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter first name"
                  autoComplete="given-name"
                  isInvalid={!!errors.first_name}
                  {...register('first_name')}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.first_name?.message}
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group controlId="signupLastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter last name"
                  autoComplete="family-name"
                  isInvalid={!!errors.last_name}
                  {...register('last_name')}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.last_name?.message}
                </Form.Control.Feedback>
              </Form.Group>
            </div>

            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="At least 8 characters"
                autoComplete="new-password"
                isInvalid={!!errors.password}
                {...register('password')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4" controlId="signupConfirmPassword">
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repeat your password"
                autoComplete="new-password"
                isInvalid={!!errors.confirmPassword}
                {...register('confirmPassword')}
              />
              <Form.Control.Feedback type="invalid">
                {errors.confirmPassword?.message}
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
              Sign up
            </Button>
          </Form>
          <p className="text-center mt-3 mb-0">
            Already have an account? <Link to={CLIENT_ROUTES.login}>Login</Link>
          </p>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Signup;
