import ChangePwdContainer from '../../../components/common/siginin/ChangePwdContainer';
import {useTokenStore} from '../../../store/store';

export default function ChangePwd() {
  const {isAuthenticated} = useTokenStore();

  return isAuthenticated && <ChangePwdContainer />;
}
