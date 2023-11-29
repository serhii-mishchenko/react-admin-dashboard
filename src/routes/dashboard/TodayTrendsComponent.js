import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, ResponsiveContainer } from 'recharts';


const useStyles = createUseStyles((theme) => ({
    container: {
        backgroundColor: '#FFFFFF',
        border: `1px solid ${theme.color.lightGrayishBlue2}`,
        borderRadius: 4,
        cursor: 'pointer'
    },
    graphContainer: {
        marginTop: 24,
        marginLeft: 0,
        marginRight: 0,
        width: '100%'
    },
    graphSection: {
        padding: 24
    },
    graphSubtitle: {
        ...theme.typography.smallSubtitle,
        color: theme.color.grayishBlue2,
        marginTop: 4,
        marginRight: 8
    },
    graphTitle: {
        ...theme.typography.cardTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    legendTitle: {
        ...theme.typography.smallSubtitle,
        fontWeight: '600',
        color: theme.color.grayishBlue2,
        marginLeft: 8
    },
    separator: {
        backgroundColor: theme.color.lightGrayishBlue2,
        width: 1,
        minWidth: 1
    },
    statContainer: {
        borderBottom: `1px solid ${theme.color.lightGrayishBlue2}`,
        padding: '24px 32px 24px 32px',
        height: 'calc(114px - 48px)',
        '&:last-child': {
            border: 'none'
        }
    },
    stats: {
        borderTop: `1px solid ${theme.color.lightGrayishBlue2}`,
        width: '100%'
    },
    statTitle: {
        fontWeight: '600',
        fontSize: 16,
        lineHeight: '22px',
        letterSpacing: '0.3px',
        textAlign: 'center',
        color: theme.color.grayishBlue2,
        whiteSpace: 'nowrap',
        marginBottom: 6
    },
    statValue: {
        ...theme.typography.title,
        textAlign: 'center',
        color: theme.color.veryDarkGrayishBlue
    }
}));

function TodayTrendsComponent({data}) {
    const theme = useTheme();
    const classes = useStyles({ theme });

    const calculateLastSevenDays = () => {
        var received = 0;
        var processed = 0;
        var sent = 0;
        var error = 0;
        for (let i = 0; i < data.lastSevenDays.length; i++) {
            const row = data.lastSevenDays[i];
            received += row.received;
            processed += row.processed;
            sent += row.sent;
            error += row.error;
        }
        return {
            received,
            processed,
            sent,
            error
        }
          
    };

    const lastSevenDays = calculateLastSevenDays();

    const getChartData = () => {
        const values = data.lastSevenDays.map((row) => {
            return {
                name: new Date(row.date),
                uv: row.received
            }
        });
        values.sort((date1, date2) => date1.name - date2.name);
        let options = {
            // year: "numeric",
            month: "short",
            day: "numeric",
          };
        return values.map((row) => {
            return {
                name: new Intl.DateTimeFormat("en-US", options).format(row.name),
                // name: row.name.toDateString()
                uv: row.uv
            }
        });
    };

    const chartData = getChartData();

    function renderLegend(color, title) {
        return (
            <Row vertical='center'>
                <div style={{ width: 16, border: '2px solid', borderColor: color }}></div>
                <span className={classes.legendTitle}>{title}</span>
            </Row>
        );
    }

    function renderStat(title, value) {
        return (
            <Column
                flexGrow={1}
                className={classes.statContainer}
                vertical='center'
                horizontal='center'
            >
                <span className={classes.statTitle}>{title}</span>
                <span className={classes.statValue}>{value}</span>
            </Column>
        );
    }

    return (
        <Row
            flexGrow={1}
            className={classes.container}
            horizontal='center'
            breakpoints={{ 1024: 'column' }}
        >
            <Column
                wrap
                flexGrow={7}
                flexBasis='735px'
                className={classes.graphSection}
                breakpoints={{ 1024: { width: 'calc(100% - 48px)', flexBasis: 'auto' } }}
            >
                <Row wrap horizontal='space-between'>
                    <Column>
                        <span className={classes.graphTitle}>Week trend</span>
                        {/* <span className={classes.graphSubtitle}>as of 25 May 2019, 09:41 PM</span> */}
                    </Column>
                    {/* {renderLegend(theme.color.green, 'Week')} */}
                </Row>
                <div className={classes.graphContainer}>
                <ResponsiveContainer minWidth={500} minHeight={500}>
                    <LineChart width={1000} height={500} data={chartData}>
                        <Line type="monotone" dataKey="uv" stroke={theme.color.green} />
                        <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                        <XAxis
                            dataKey="name"
                            interval={0}
                            // style={{
                            //     fontSize: '1rem',
                            // }}
                        />
                        <YAxis
                            allowDecimals={false}
                            // style={{
                            //     fontSize: '1rem',
                            // }}
                        />
                    </LineChart>
                </ResponsiveContainer>
                </div>
            </Column>
            <Column className={classes.separator} breakpoints={{ 1024: { display: 'none' } }}>
                <div />
            </Column>
            <Column flexGrow={3} flexBasis='342px' breakpoints={{ 1024: classes.stats }}>
                {renderStat('Received', lastSevenDays.received)}
                {renderStat('Processed', lastSevenDays.processed)}
                {renderStat('Sent', lastSevenDays.sent)}
                {renderStat('Errors', lastSevenDays.error)}
            </Column>
        </Row>
    );
}

export default TodayTrendsComponent;
