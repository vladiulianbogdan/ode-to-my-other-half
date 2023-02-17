import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Input,
} from "reactstrap";
import { useState, useRef, useEffect } from "react";
import { AuthResultStatus, User, UserService } from "../sdk/userService.sdk";

export default function Dashboard() {
    const [user, setUser] = useState<User|undefined>(undefined);
    const [inputValue, setInputValue] = useState("");
    const [phone, setPhone] = useState("");
    const [hour, setHour] = useState("");
    const [poemAjective, setPoemAdjective] = useState("");
    const [words, setWords] = useState<string>("");
    const ref = useRef(null);

    useEffect(() => {
        const _user: string|null = localStorage.getItem("user");

        if (_user) {
            const currentUser: User = JSON.parse(_user);
            setUser(currentUser)

            UserService.getPreferences(currentUser._id).then((response: any) => {
                if (response.status === AuthResultStatus.Fail) {
                    console.log("Error...")
                }

                setPhone(response.phone)
                setPoemAdjective(response.poemSettings?.poemAdjective)
                setWords(response.poemSettings?.words)
                setHour(response.hour)
            });
        }
    }, [])

    const saveButtonPressed = () => {
        console.log("Saved!")

        if (user?._id === undefined) {
            console.log("User not logged in!")
            return
        }

        UserService.setPreferences(user?._id!, poemAjective, words.split(","), parseInt(hour), phone)
            .then((result) => {
                if (result.status === AuthResultStatus.Ok) {
                    console.log("Success")
                } else {
                    console.log("Failure")
                }
            })
    }

    return (
        <Container className="mt-2">
            <Card className="p-4 mt-2">

                <Row className="mt-2">
                    <Col sm="11">
                        <h3>Configuration</h3>

                        <Row>
                            <>
                            <label>Phone</label>
                            <Input
                                className="form-control"
                                placeholder="Phone"
                                type="text"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                autoComplete="phne"
                            />
                            <label>Poem Adjective</label>
                            <Input
                                className="form-control"
                                placeholder="Poem Adjective"
                                type="text"
                                value={poemAjective}
                                onChange={(e) => setPoemAdjective(e.target.value)}
                                autoComplete="poem adjective"
                            />
                            <label>Hour</label>
                            <Input
                                className="form-control"
                                placeholder="Hour"
                                type="text"
                                value={hour}
                                onChange={(e) => setHour(e.target.value)}
                                autoComplete="poem adjective"
                            />
                                Include Words:
                                <div style={{ display: "flex" }}>
                                    <Input
                                        ref={ref}
                                        className="form-control"
                                        placeholder="Poem Adjective"
                                        type="text"
                                        value={words}
                                        onChange={(e) => setWords(e.target.value)}
                                        autoComplete="poem adjective"
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    color="primary"
                                    onClick={() => { saveButtonPressed() }}
                                >
                                    Save
                                </Button>
                                </>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}