import React from 'react';
import { Row } from 'simple-flexbox';
import { createUseStyles, useTheme } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';

const useStyles = createUseStyles((theme) => ({
    itemTitle: {
        ...theme.typography.itemTitle,
        color: theme.color.veryDarkGrayishBlue
    },
    itemValue: {
        color: theme.color.grayishBlue2
    }
}));

function UnresolvedTicketsComponent({ containerStyles }) {
    const theme = useTheme();
    const classes = useStyles({ theme });

    function renderStat(title, value) {
        return (
            <Row horizontal='space-between' vertical='center'>
                <span className={classes.itemTitle}>{title}</span>
                <span className={[classes.itemTitle, classes.itemValue].join(' ')}>{value}</span>
            </Row>
        );
    }

    return (
        <CardComponent
            containerStyles={containerStyles}
            title='Candidates in progress'
            subtitle='Group:'
            subtitleTwo='Support'
            items={[
                renderStat('Applied', 4238),
                renderStat('Waiting for HR interview', 1005),
                renderStat('Waiting for technical interview', 500),
                renderStat('Got offer', 500),
            ]}
        />
    );
}

export default UnresolvedTicketsComponent;
