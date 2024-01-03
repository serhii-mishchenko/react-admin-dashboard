import React from 'react';
import { useQuery } from 'react-query'

import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import FullWidthCardComponent from 'components/cards/FullWidthCardComponent';
import TodayTrendsComponent from './TodayTrendsComponent';

const useStyles = createUseStyles({
    top: {
        maxWidth: 1440,
    },
    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        }
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    },
    fullWidthCard: {
        marginBottom: 30
    }
});

function DashboardComponent() {
    const classes = useStyles();
    const { data } = useQuery(
        'data',
        () => fetch('/stat/get_statistics').then(res => res.json()),
        {
            refetchInterval: 1 * (60 * 1000), // 1 min 
            initialData: {
                all: {
                    received: 0,
                    processed: 0,
                    sent: 0,
                    error: 0,
                },
                lastSevenDays: []
            }
        }
    );

    return (
        <Column className={classes.top}>
            <Row className={classes.fullWidthCard}>
                <h1>Application Traceability Dashboard</h1>
            </Row>
            <Row className={classes.fullWidthCard}>
                <FullWidthCardComponent
                    title="Number of companies onboarded:"
                    value={1}
                />                
            </Row>
            <Row className={classes.fullWidthCard}>
                <FullWidthCardComponent
                    title="Number of websites/domains onboarded:"
                    value={1}
                />
            </Row>
            <Row
                className={classes.cardsContainer}
                wrap
                flexGrow={1}
                horizontal='space-between'
                breakpoints={{ 768: 'column' }}
            >
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Received'
                        value={data.all.received}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Processed'
                        value={data.all.processed}
                    />
                </Row>
                <Row
                    className={classes.cardRow}
                    wrap
                    flexGrow={1}
                    horizontal='space-between'
                    breakpoints={{ 384: 'column' }}
                >
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Sent'
                        value={data.all.sent}
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Errors'
                        value={data.all.error}
                    />
                </Row>
            </Row>
            <div className={classes.todayTrends}>
                <TodayTrendsComponent data={data}/>
            </div>
        </Column>
    );
}

export default DashboardComponent;
