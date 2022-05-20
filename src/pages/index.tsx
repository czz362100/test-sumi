
import Render from "@/Render";
import { history } from 'umi';
export default function IndexPage() {
  return (
    <div>
      this is shouye
      <button onClick={() => history.push('/cloudIde')}>cloudIDE</button>
    </div>
  );
}
