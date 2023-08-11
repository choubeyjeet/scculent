import { Nav } from 'rsuite';
import FacebookSquareIcon from '@rsuite/icons/legacy/FacebookSquare';
import GithubAltIcon from '@rsuite/icons/legacy/GithubAlt';
import CircleIcon from '@rsuite/icons/legacy/Circle';
import ChromeIcon from '@rsuite/icons/legacy/Chrome';
import GearIcon from '@rsuite/icons/Gear';
import NoticeIcon from '@rsuite/icons/Notice';


export const AdminHeaderPage = ()=>{
    return(<> 
    
     <Nav style={{padding:30, margin:20, float:"right"}}>
        
        <Nav.Item>Dashboard</Nav.Item>
        <Nav.Item icon={<GithubAltIcon />}>github</Nav.Item>
        <Nav.Item icon={<CircleIcon />}>amazon</Nav.Item>
        <Nav.Item icon={<NoticeIcon />}></Nav.Item>
        <Nav.Menu icon={<GearIcon />} >
          <Nav.Item></Nav.Item>
          <Nav.Item>Sign Out</Nav.Item>
          
        </Nav.Menu>
      </Nav></>)
}