import * as React from 'react';

import Divider from 'material-ui/Divider';

interface StartProps {
}

export const Start = (props: StartProps) => (
    <div>
        <h1>Welcome to Υπερίων</h1>
        <p>
            Υπερίων is a web application to monitor a 'Smart Energy Meter' that follows the
            Dutch "Smart Meter" Requirements, or DSMR for short.
        </p>

        <p>
            Open the menu on the left to get started.
        </p>
        <Divider />

        <p>
            &copy; 2016 - 2017 Maarten Mulders.<br />
            Source code is available at <a href='https://github.com/mthmulders/hyperion-web' target='_blank'>GitHub</a>.
        </p>
    </div>
);
