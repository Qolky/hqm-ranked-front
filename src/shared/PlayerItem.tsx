import { useNavigate } from 'react-router-dom';
import styles from './PlayerItem.module.css'
import { Avatar, Tooltip } from 'antd';
import { useMemo } from 'react';

export enum PlayerItemType {
    Both,
    Avatar,
    Name
}

interface IProps {
    id: number;
    name: string;
    type?: PlayerItemType,
}

const PlayerItem = ({ id, name, type = PlayerItemType.Both }: IProps) => {
    const navigate = useNavigate();

    const avatarName = useMemo(() => {
        return name[0].toUpperCase()
    }, [name])

    return (
        <div
            className={styles.playerItem}
            onClick={() => navigate("/player?id=" + id)}
        >
            {(type === PlayerItemType.Both || type === PlayerItemType.Avatar) &&
                <Tooltip title={type === PlayerItemType.Avatar ? name : undefined}>
                    <Avatar shape='square' src={process.env.REACT_APP_API_URL + "/avatars/" + id + ".png"}>{avatarName}</Avatar>
                </Tooltip>
            }
            {(type === PlayerItemType.Both || type === PlayerItemType.Name) &&
                name
            }
        </div>
    )
}

export default PlayerItem;