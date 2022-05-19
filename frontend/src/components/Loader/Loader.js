import './Loader.css';

export default function Loader(props) {
  return <div className={'loader' + (props.className ? ` ${props.className}` : '' )}></div>
}