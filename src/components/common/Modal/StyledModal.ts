import styled from 'styled-components'
import Popup from "reactjs-popup";

export const StyledModal = styled(Popup)`
    // animation on Modal Open
    @keyframes anvil {
      0% {
        transform: scale(1) translateY(0px);
        opacity: 0;
        box-shadow: 0 0 0 rgba(241, 241, 241, 0);
      }
      1% {
        transform: scale(0.96) translateY(10px);
        opacity: 0;
        box-shadow: 0 0 0 rgba(241, 241, 241, 0);
      }
      100% {
        transform: scale(1) translateY(0px);
        opacity: 1;
        box-shadow: 0 0 500px rgba(241, 241, 241, 0);
      }
    }
    
  // custom style for ".popup-overlay"
  &-overlay {
    background: rgba(0, 0, 0, 0.7);
  }
  
  // custom style for ".popup-content"
  &-content {    
    width: 90%;
    max-width: 550px;
    padding: 30px;
    margin: auto;
    background: #fff;
    -webkit-animation: anvil 0.3s cubic-bezier(0.38, 0.1, 0.36, 0.9) forwards;
  }
`;