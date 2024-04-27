import { Card, Col, Row, Table, Tag, Typography } from "antd";
import { useAppDispatch } from "hooks/useAppDispatch";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { convertDate } from "shared/DateConverter";
import { selectCurrentGameData } from "stores/season";
import { getGameData } from "stores/season/async-actions";
import styles from './Game.module.css'
import PlayerItem from "shared/PlayerItem";

const { Text, Title } = Typography;

const Game = () => {
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const currentGameData = useSelector(selectCurrentGameData);

    useEffect(() => {
        const id = searchParams.get("id");
        if (id) {
            dispatch(getGameData({
                id: id
            }));
        }
    }, []);

    return currentGameData ? (
        <Row gutter={[0, 16]}>
            <Col xs={24} sm={8}>
                <Card bodyStyle={{ padding: 0 }}>
                    <Table
                        dataSource={currentGameData.players.filter(x => x.team == 0)}
                        bordered={false}
                        pagination={false}
                        rowKey={"id"}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "name",
                                render(value, record, index) {
                                    return <PlayerItem id={record.id} name={record.name} />
                                },
                            },
                            {
                                title: "G",
                                align: "right",
                                dataIndex: "goals"
                            },
                            {
                                title: "A",
                                align: "right",
                                dataIndex: "assists"
                            },
                            {
                                title: "Score",
                                align: "right",
                                dataIndex: "score"
                            },
                        ]}
                    />
                </Card>
            </Col>
            <Col xs={24} sm={8} className={styles.centerData}>
                <Title level={3}>{currentGameData.redScore + " - " + currentGameData.blueScore}</Title>
                <Text type="secondary">{convertDate(currentGameData.date)}</Text>
                <Tag>{currentGameData.state}</Tag>
            </Col>
            <Col xs={24} sm={8} className="right-align">
                <Card bodyStyle={{ padding: 0 }}>
                    <Table
                        dataSource={currentGameData.players.filter(x => x.team == 1)}
                        bordered={false}
                        pagination={false}
                        rowKey={"id"}
                        columns={[
                            {
                                title: "Name",
                                dataIndex: "name",
                                render(value, record, index) {
                                    return <PlayerItem id={record.id} name={record.name} />
                                },
                            },
                            {
                                title: "G",
                                align: "right",
                                dataIndex: "goals"
                            },
                            {
                                title: "A",
                                align: "right",
                                dataIndex: "assists"
                            },
                            {
                                title: "Score",
                                align: "right",
                                dataIndex: "score"
                            },
                        ]}
                    />
                </Card>
            </Col>
        </Row>
    ) : <div />
}

export default Game;