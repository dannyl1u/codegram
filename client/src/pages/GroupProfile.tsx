import { HeaderNav } from "../components/HeaderNav"
import { Button } from "../components/Button"
import { useParams } from "react-router-dom"
import { GroupInfoHeader } from "../components/GroupInfoHeader"
import { useState, useEffect } from "react"
import { IconAddBtnPlus } from "../icons"
import { useNavigate, Outlet, useLocation } from "react-router-dom"

import axios from "axios"

import styles from "./GroupProfile.module.scss"

enum GroupProfilePageTab {
  activity = "Activity",
  members = "Members"
}

interface GroupInfo {
  group_id: number,
  name: string,
  created_at: string
}

export const GroupProfilePage = () => {
  const navigate = useNavigate()
  const { groupId } = useParams()
  const [ groupInfoData, setGroupInfoData ] = useState<GroupInfo>()
  const location = useLocation()
  const [ activeTab, setActiveTab ] = useState<GroupProfilePageTab>(() =>
  location.pathname.includes("/members") ? GroupProfilePageTab.members : GroupProfilePageTab.activity)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/group/${groupId}`,
          {
            withCredentials: true,
          }
        );
        const jsonData = await response.data;
  
        setGroupInfoData (jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [groupId]);

  const onClickInviteMember = () => console.log("test")

  return <>
    <HeaderNav />
    {groupInfoData && <div className={styles.groupProfilePage}>
        <header>
          <GroupInfoHeader 
            groupName={groupInfoData.name}
            createdAt={groupInfoData.created_at}
            />
          <Button onClick={onClickInviteMember}><IconAddBtnPlus /> Invite Member</Button>
        </header>
        <nav className={styles.tabNav}>
          <button 
            className={activeTab === GroupProfilePageTab.activity ? styles.active : ''} 
            onClick={() => {
              setActiveTab(GroupProfilePageTab.activity)
              navigate("")
            }}>
              {GroupProfilePageTab.activity}
          </button>
          <button 
            className={activeTab === GroupProfilePageTab.members ? styles.active : ''} 
            onClick={() => {
              setActiveTab(GroupProfilePageTab.members)
              navigate("members")
            }}>
              {GroupProfilePageTab.members}
          </button>
        </nav>
        <Outlet />
      </div>
    }
  </>
}