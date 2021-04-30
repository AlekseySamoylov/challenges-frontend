class ApiClient {

    static SERVER_URL = 'http://localhost:8080'
    static GET_CHALLENGE = '/challenges/random'
    static ATTEMPTS = '/attempts'
    static BY_ALIAS = '?alias='

    static challenge(): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.GET_CHALLENGE)
    }

    static sendGuess(user: string,
                     a: number,
                     b: number,
                     guess: number): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.ATTEMPTS,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(
                    {
                        userAlias: user,
                        factorA: a,
                        factorB: b,
                        guess: guess
                    }
                )
            })
    }

    static getLast10Attempts(userAlias: string): Promise<Response> {
        return fetch(ApiClient.SERVER_URL + ApiClient.ATTEMPTS + ApiClient.BY_ALIAS + userAlias)
    }
}

export default ApiClient