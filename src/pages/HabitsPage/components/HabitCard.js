import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import trashIcon from "../../../assets/trash.svg"
import days from "../../../constants/days";
import { url } from "../../../constants/url";
import UserInfoContext from "../../../contexts/UserInfoContext";
import { BtnDays } from "../styled";

export default function HabitCard(props) {
    const { userInfo, setUserInfo } = useContext(UserInfoContext);
    function deleteHabit(id) {
        if (window.confirm('Você quer realmente deletar o hábito?')) {
            const config = {
                headers: {
                    "Authorization": `Bearer ${userInfo.token}`
                }
            };
            axios.delete(`${url}/habits/${id}`, config)
                .then(() => setUserInfo({ ...userInfo, habits: [...userInfo.habits.filter(h => h.id != id)] }))
                .catch(err => alert(err.response.data.message));
        }
    }

    return (
        <HabitWrapper data-test="habit-container">
            <HabitInfo>
                <div data-test="habit-name">
                    {props.card.name}
                </div>
                <img src={trashIcon} onClick={() => deleteHabit(props.card.id)} data-test="habit-delete-btn" />
            </HabitInfo>
            <ButtonsWrapper>
                {days.map((d, i) => <BtnDays key={i} id={i} selected={props.card.days.includes(i)} data-test="habit-day">{d}</BtnDays>)}
            </ButtonsWrapper>
        </HabitWrapper>
    );
}

const HabitInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    img{
        align-self: flex-start;
    }
`;

const HabitWrapper = styled.li`
    background: #FFFFFF;
    border-radius: 5px;
    padding: 13px 11px 15px 15px;
    margin-bottom: 10px;

`;

const ButtonsWrapper = styled.div`
    margin-top: 8px;
    display: flex;
    div{
        display: flex;
        justify-content: center;
        align-items: center;
    }
`;