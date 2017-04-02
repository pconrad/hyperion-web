import * as React from 'react'

import { RecentReading } from '../model'

export interface ViewProps {
    data: RecentReading[]
}

export default (props: ViewProps) => (
    <div>We have { props.data.length } records</div>
);