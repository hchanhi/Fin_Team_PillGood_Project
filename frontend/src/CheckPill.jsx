import * as React from 'react';
import { useEffect } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import { Divider, Paper } from '@mui/material';
import { getNickName } from "./jwtCheck";
import axios from "axios";

export default function CheckPill() {
    const [checked, setChecked] = React.useState([1]);
    const [pillCheck, setPillCheck] = React.useState([]);
    const token = JSON.parse(localStorage.getItem('accessToken'));
    const nickname = getNickName(token);


    //아침
    const handleToggleAm = (amValue) => () => {
        const currentIndex = checked.indexOf(amValue.supplementsName);
        const newChecked = [...checked];
        let params = { nickname: nickname, supplementsName: amValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(amValue.supplementsName);
            axios.post("/api/supplements/check", params)
                .then(function (res) {
                    console.log("성공");

                })
                .catch(function (err) {
                    console.log(err);

                });

        } else {
            newChecked.splice(currentIndex, 1);
            axios.delete("/api/supplements/uncheck", { data: params })
                .then(function (res) {
                    console.log("성공");


                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        setChecked(newChecked);

    };

    //점심
    const handleToggleNoon = (noonValue) => () => {
        const currentIndex = checked.indexOf(noonValue.supplementsName);
        const newChecked = [...checked];
        let params = { nickname: nickname, supplementsName: noonValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(noonValue.supplementsName);

            axios.post("/api/supplements/check", params)
                .then(function (res) {
                    console.log("성공");

                })
                .catch(function (err) {
                    console.log(err);

                });
        } else {
            newChecked.splice(currentIndex, 1);

            axios.delete("/api/supplements/uncheck", { data: params })
                .then(function (res) {
                    console.log("성공");

                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        setChecked(newChecked);

    };
    //저녁
    const handleTogglePm = (pmValue) => () => {
        const currentIndex = checked.indexOf(pmValue.supplementsName);
        const newChecked = [...checked];
        let params = { nickname: nickname, supplementsName: pmValue.supplementsName };
        if (currentIndex === -1) {
            newChecked.push(pmValue.supplementsName);
            axios.post("/api/supplements/check", params)
                .then(function (res) {
                    console.log("성공");
                })
                .catch(function (err) {
                    console.log(err);

                });
        } else {
            newChecked.splice(currentIndex, 1);
            axios.delete("/api/supplements/uncheck", { data: params })
                .then(function (res) {
                    console.log("성공");
                    console.log(res.data);

                })
                .catch(function (err) {
                    console.log(err);

                });
        }

        setChecked(newChecked);
    };

    function pill() {

        let params = { nickname: nickname };
        axios.get("/api/supplements/list", { params })
            .then(function (res) {
                console.log("성공");
                setPillCheck(res.data);


            })
            .catch(function (err) {
                console.log('실패');

            });

    }

    function isCheck() {
        let body = { nickname: nickname };
        axios.get("/api/supplements/eatenlist", { params: body })
            .then(function (res) {

                for (var i = 0; i < res.data.length; i++) {
                    if (checked[i + 1] !== res.data[i].supplementsName) { checked.push(res.data[i].supplementsName); }

                }


            })
            .catch(function (err) {
                console.log('실패');

            });
    }
    useEffect(() => {
        pill();
        isCheck();


    }, []);

    return (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>

            <Paper elevation={6} sx={{ width: '120px', maxWidth: 360, borderRadius: '20px' }}>

                <List dense sx={{ width: '120px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '20px' }}>
                    <ListItemText
                        sx={{ my: 0, textAlign: 'center' }}
                        primary="아침"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider style={{ marginBottom: '5px' }} />
                    {pillCheck.map((amValue) => {
                        const labelId = `checkbox-list-secondary-label-${amValue.id}`;
                        return (
                            <div>
                                {
                                    amValue.slot === "MORNING" ? <div>
                                        <ListItem
                                            key={amValue}
                                            secondaryAction={
                                                <Checkbox

                                                    edge="end"
                                                    onChange={handleToggleAm(amValue)}
                                                    checked={checked.some(v => v === amValue.supplementsName) === true}
                                                    inputProps={{ 'aria-labelledby': labelId }}

                                                    sx={{
                                                        color: 'orange',
                                                        '&.Mui-checked': {
                                                            color: 'orange',
                                                        },
                                                    }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>

                                                <ListItemText id={labelId} primary={amValue.supplementsName} />
                                            </ListItemButton>
                                        </ListItem>
                                    </div> :
                                        <div style={{ display: 'none' }}></div>
                                }
                            </div>
                        );
                    })}
                </List>
            </Paper>

            <Paper elevation={6} sx={{ width: '120px', maxWidth: 360, borderRadius: '20px' }}>
                <List dense sx={{ width: '120px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '20px' }}>
                    <ListItemText
                        sx={{ my: 0, textAlign: 'center' }}
                        primary="점심"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider style={{ marginBottom: '5px' }} />

                    {pillCheck.map((noonValue) => {
                        const labelId = `checkbox-list-secondary-label-${noonValue.id}`;
                        return (
                            <div>

                                {
                                    noonValue.slot === "LUNCH" ? <div>
                                        <ListItem
                                            key={noonValue}
                                            secondaryAction={
                                                <Checkbox

                                                    edge="end"
                                                    onChange={handleToggleNoon(noonValue)}
                                                    checked={checked.some(v => v === noonValue.supplementsName) === true}
                                                    inputProps={{ 'aria-labelledby': labelId }}

                                                    sx={{
                                                        color: 'orange',
                                                        '&.Mui-checked': {
                                                            color: 'orange',
                                                        },
                                                    }}
                                                />
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton>

                                                <ListItemText id={labelId} primary={noonValue.supplementsName} />
                                            </ListItemButton>
                                        </ListItem>
                                    </div>
                                        : <div style={{ display: 'none' }}></div>
                                }
                            </div>
                        );
                    })}
                </List>
            </Paper>
            <Paper elevation={6} sx={{ width: '120px', maxWidth: 360, borderRadius: '20px' }}>
                <List dense sx={{ width: '120px', maxWidth: 360, bgcolor: 'background.paper', borderRadius: '20px' }}>
                    <ListItemText
                        sx={{ my: 0, textAlign: 'center' }}
                        primary="저녁"
                        primaryTypographyProps={{
                            fontSize: 20,
                            fontWeight: 'medium',
                            letterSpacing: 0,
                        }}
                    />
                    <Divider style={{ marginBottom: '5px' }} />
                    {

                        pillCheck.map((pmValue) => {
                            const labelId = `checkbox-list-secondary-label-${pmValue.id}`;
                            return (
                                <div>
                                    {

                                        pmValue.slot === "DINNER" ?
                                            <div>
                                                <ListItem
                                                    key={pmValue}
                                                    secondaryAction={
                                                        <Checkbox

                                                            edge="end"
                                                            onChange={handleTogglePm(pmValue)}
                                                            checked={checked.some(v => v === pmValue.supplementsName) === true}
                                                            inputProps={{ 'aria-labelledby': labelId }}

                                                            sx={{
                                                                color: 'orange',
                                                                '&.Mui-checked': {
                                                                    color: 'orange',
                                                                },
                                                            }}

                                                        />
                                                    }
                                                    disablePadding
                                                >
                                                    <ListItemButton>

                                                        <ListItemText id={labelId} primary={pmValue.supplementsName} />
                                                    </ListItemButton>
                                                </ListItem>
                                            </div>
                                            :
                                            <div style={{ display: 'none' }}></div>
                                    }
                                </div>
                            );
                        })

                    }

                </List>
            </Paper>
        </div>
    );
}