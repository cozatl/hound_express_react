declare module 'react-router-hash-link' {
    import {LinkProps} from 'react-router-dom';
    import * as React from 'react';

    export const HashLink: React.FC<LinkProps & {
        smooth?: boolean;
    }>;
}