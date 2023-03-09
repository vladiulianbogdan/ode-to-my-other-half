import {
    Button,
    Card,
    Container,
    Row,
    Col,
    Input,
    Spinner
} from "reactstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthResultStatus, User, UserService } from "../sdk/userService.sdk";
import { PoemPreview } from "../sdk/poemPreview.sdk";

export default function Dashboard() {
    const [user, setUser] = useState<User | undefined>(undefined);
    const [preview, setPreview] = useState("");
    const [phone, setPhone] = useState("");
    const [hour, setHour] = useState("");
    const [poemAjective, setPoemAdjective] = useState("");
    const [words, setWords] = useState<string>("");

    const [buttonLoading, setButtonLoading] = useState(false);

    const ref = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const _user: string | null = localStorage.getItem("user");

        if (_user) {
            const currentUser: User = JSON.parse(_user);
            setUser(currentUser)

            UserService.getPoems(currentUser._id).then((response: any) => {

            })

            UserService.getPreferences(currentUser._id).then((response: any) => {
                if (response.status === AuthResultStatus.Fail) {
                    console.log("Error...")
                }

                setPhone(response.phone)
                setPoemAdjective(response.poemSettings?.poemAdjective)
                setWords(response.poemSettings?.words.join(","))
                setHour(response.hour)
            });
        } else {
            console.log("User not logged in!");
            navigate("/login");
        }
    }, [])

    const saveButtonPressed = async () => {
        console.log("Saved!")
        setButtonLoading(true)

        if (user?._id === undefined) {
            console.log("User not logged in!")
            return
        }
        try {
            const result = await UserService.setPreferences(user?._id!, poemAjective, words.split(","), parseInt(hour), phone)
            if (result.status === AuthResultStatus.Ok) {
                console.log("Success")
            } else {
                console.log("Failure")
            }
        } catch (e) {
            console.log(e)
        }
        setButtonLoading(false)
    }

    const previewButtonPressed = async () => {
        console.log("Saved!")

        if (user?._id === undefined) {
            console.log("User not logged in!")
            return
        }

        const result = await PoemPreview.generatePoemPreview(user?._id!, "")
        setPreview(result)
    }

    const onLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("apiToken");
        navigate("/login");
    }

    return (
        <Container className="mt-2">
            <Card className="p-4 mt-2">

                <Row className="mt-2">
                    <Col sm="11">
                        <Row>
                            <Col lg="11">
                                <h3>Configuration</h3>
                            </Col>
                            <Col lg="1">
                                <Button
                                    className="btn btn-primary"
                                    onClick={onLogout}
                                >
                                    Logout
                                </Button>
                            </Col>
                        </Row>
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
                                <label>Include Words (separate them using commas):</label>
                                <Input
                                    ref={ref}
                                    className="form-control mb-4"
                                    placeholder="Words to include in poem"
                                    type="text"
                                    value={words}
                                    onChange={(e) => setWords(e.target.value)}
                                    autoComplete="poem adjective"
                                />

                                <Button
                                    className="mb-2"
                                    type="submit"
                                    color="primary"
                                    onClick={() => { saveButtonPressed() }}
                                >
                                    {buttonLoading && <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                    />}
                                    Save
                                </Button>
                                <Button
                                    type="submit"
                                    color="primary"
                                    onClick={() => { previewButtonPressed() }}
                                >
                                    Preview
                                </Button>
                            </>
                            <div style={{whiteSpace: "pre-line"}}>{preview}</div>
                        </Row>
                    </Col>
                </Row>
            </Card>
        </Container>
    )
}