import React from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import MiniCardComponent from 'components/cards/MiniCardComponent';
import TodayTrendsComponent from './TodayTrendsComponent';
import UnresolvedTicketsComponent from './UnresolvedTicketsComponent';
import TasksComponent from './TasksComponent';

const useStyles = createUseStyles({
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
    }
});

function DashboardComponent() {
    const classes = useStyles();
    return (
        <Column>
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
                        value='449'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Processed'
                        value='426'
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
                        value='332'
                    />
                    <MiniCardComponent
                        className={classes.miniCardContainer}
                        title='Errors'
                        value='254'
                    />
                </Row>
            </Row>
            <div className={classes.todayTrends}>
                <TodayTrendsComponent />
            </div>
            <Row
                horizontal='space-between'
                className={classes.lastRow}
                breakpoints={{ 1024: 'column' }}
            >
                <UnresolvedTicketsComponent containerStyles={classes.unresolvedTickets} />
                <TasksComponent containerStyles={classes.tasks} />
            </Row>
        </Column>
    );
}

export default DashboardComponent;
