import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Leaderboard from "../components/Leaderboard/Leaderboard";

const mockStore = configureStore([]);
const initialState = {
  users: {
    sarahedo: {
      id: "sarahedo",
      name: "Sarah Edo",
      avatarURL: "https://austinmonthly.wppcdn.com/wp-content/uploads/2019/10/JackieVenson1.jpeg",
      answers: {
        "8xf0y6ziyjabvozdd253nd": "optionOne",
        "6ni6ok3ym7mf1p33lnez": "optionOne",
        "am8ehyc8byjqgar0jgpub9": "optionTwo",
        "loxhs1bqm25b708cmbf3g": "optionTwo",
      },
      questions: ["8xf0y6ziyjabvozdd253nd", "am8ehyc8byjqgar0jgpub9"],
    },
    tylermcginnis: {
      id: "tylermcginnis",
      name: "Tyler McGinnis",
      avatarURL: "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
      answers: {
        "vthrdm985a262al8qx3do": "optionOne",
        "xj352vofupe1dqz9emx13r": "optionTwo",
      },
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
  },
};

describe("Leaderboard Interaction Test", () => {
  it("simulates a click and verifies the interaction", () => {
    const store = mockStore(initialState);

    render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );


    const firstUser = screen.getByText("Sarah Edo");
    fireEvent.click(firstUser);

    expect(screen.getByText("Sarah Edo")).toBeInTheDocument();

   
  });
});
