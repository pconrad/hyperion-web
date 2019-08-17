import * as React from 'react';

import { Container } from 'reactstrap';

import { Route, Switch } from 'react-router-dom';

import AboutContainer from './about/container';
import Footer from './components/footer';
import Navigation from './components/navigation';
import Start from './components/start';
import DailyHistoryContainer from './history/daily/container';
import MonthlyHistoryContainer from './history/monthly/container';
import LiveContainer from './live/container';
import RecentContainer from './recent/container';
import MonthlyUsageContainer from './usage/monthly/container';

const Main = (props: any) => <main { ...props }>{ props.children }</main>;

export class App extends React.Component<{}, {}> {
    render() {
        return (
            <React.Fragment>
                <Navigation />
                <Container tag={ Main } role='main'>
                    <Switch>
                        <Route exact={ true } path='/' component={ Start } />
                        <Route path='/live' component={ LiveContainer } />
                        <Route path='/history/daily' component={ DailyHistoryContainer } />
                        <Route path='/history/monthly' component={ MonthlyHistoryContainer } />
                        <Route path='/recent' component={ RecentContainer } />
                        <Route path='/usage/monthly' component={ MonthlyUsageContainer } />
                        <Route path='/about' component={ AboutContainer } />
                    </Switch>
                </Container>
                <Footer />
            </React.Fragment>
        );
    }
}
