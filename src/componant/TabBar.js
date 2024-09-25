import React, { useContext } from 'react'
import Diversity3SharpIcon from '@mui/icons-material/Diversity3Sharp';
import PersonSharpIcon from '@mui/icons-material/PersonSharp';
import { ChatContext } from '../context/ChatContext';

const TabBar = () => {

  const { setChatPhase } = useContext(ChatContext);


    const handleUser = ()=>{
        setChatPhase('user');
    }
    const handleGrp = ()=>{
        setChatPhase('group');
    }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
        <PersonSharpIcon onClick={handleUser}/>
        <Diversity3SharpIcon onClick={handleGrp}/>
    </div>
  )
}

export default TabBar