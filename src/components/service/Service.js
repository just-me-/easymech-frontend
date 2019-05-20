// @flow

import React, {useState} from 'react';
import {Button, Form, Header} from 'semantic-ui-react';
import {NotificationManager} from 'react-notifications';

import * as api from '../../api/service';

import ServiceFields from './ServiceFields';

function Service() {
    const [serviceData, setServiceData] = useState({});
    const [formIsValid, setFormIsValid] = useState(false);
    const [key, setKey] = useState(Math.random());

    function addService() {
        if (formIsValid) {
            api
                .addService(serviceData)
                .then((result) => {
                    result = api.checkResponse(result);
                    NotificationManager.success(
                        'Die Dienstleistung wurde erfolgreich gespeichert.',
                        `Erfasst`,
                    );
                    setKey(Math.random()); // clear data - fresh form for next entry
                })
                .catch((error) => {
                    console.log('Ups, ein Fehler ist aufgetreten', error);
                    if (error.code && error.code > 0) {
                        NotificationManager.error(error.msg, error.codeMsg);
                    } else {
                        NotificationManager.error(
                            'Beim Speichern der Dienstleistung ist ein Fehler aufgetreten.',
                            'Bitte erneut versuchen!',
                        );
                    }
                });
        } else {
            NotificationManager.info('Bitte prüfen Sie Ihre Eingabe!');
        }
    }

    return (
        <div>
            <Header as="h1" textAlign="center">
                Dienstleistung erfassen
            </Header>
            <Form>
                <ServiceFields key={key} setData={setServiceData} setValidState={setFormIsValid}/>
                <Button
                    primary
                    content="Speichern"
                    icon="save"
                    labelPosition="left"
                    floated="right"
                    onClick={() => addService()}
                />
            </Form>
        </div>
    );
}

export default Service;
