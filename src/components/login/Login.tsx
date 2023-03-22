import { type NextPage } from "next";

type Props = {
  children?: JSX.Element[] | JSX.Element;
};

const Login: NextPage<Props> = (props) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">

      <div>{props.children != null ? props.children : null}</div>
    </div>
  );
};

export default Login;
