import React, { Suspense, lazy } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query'
import { Redirect, Route, Switch } from 'react-router-dom';
import SLUGS from 'resources/slugs';
import LoadingComponent from 'components/loading';


const queryClient = new QueryClient()
const DashboardComponent = lazy(() => import('./dashboard'));

function PrivateRoutes() {
    return (
        <QueryClientProvider client={queryClient}>
            <Suspense fallback={<LoadingComponent loading />}>
                <Switch>
                    <Route exact path={SLUGS.dashboard} component={DashboardComponent} />
                    <Route exact path={SLUGS.overviewTwo} render={() => <div>overviewTwo</div>} />
                    <Route exact path={SLUGS.overviewThree} render={() => <div>overviewThree</div>} />
                    <Route exact path={SLUGS.overview} render={() => <div>overview</div>} />
                    <Route exact path={SLUGS.tickets} render={() => <div>tickets</div>} />
                    <Route exact path={SLUGS.ideasTwo} render={() => <div>ideasTwo</div>} />
                    <Route exact path={SLUGS.ideasThree} render={() => <div>ideasThree</div>} />
                    <Route exact path={SLUGS.ideas} render={() => <div>ideas</div>} />
                    <Route exact path={SLUGS.contacts} render={() => <div>contacts</div>} />
                    <Route exact path={SLUGS.agents} render={() => <div>agents</div>} />
                    <Route exact path={SLUGS.articles} render={() => <div>articles</div>} />
                    <Route exact path={SLUGS.settings} render={() => <div>settings</div>} />
                    <Route exact path={SLUGS.subscription} render={() => <div>subscription</div>} />
                    <Redirect to={SLUGS.dashboard} />
                </Switch>
            </Suspense>
        </QueryClientProvider>
    );
}

export default PrivateRoutes;
