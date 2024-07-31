import { useBusyContext } from '.';
// import Spinner from '../spinner';
// import { Loading } from '../loading/Loading';
import classes from './DefaultLoader.module.scss';

export function DefaultLoader () {
  const bs = useBusyContext();
  console.log(classes);
  return (null)
  // return bs.isShow ? <Spinner /> : null;
}
