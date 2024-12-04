/* eslint-disable testing-library/prefer-screen-queries */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Leaderboard from "../components/Leaderboard/Leaderboard";

const mockStore = configureStore([]);
const initialState = {
  users: {
    sarahedo: {
      id: "sarahedo",
      name: "Sarah Edo",
      avatarURL:
        "https://austinmonthly.wppcdn.com/wp-content/uploads/2019/10/JackieVenson1.jpeg",
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
      avatarURL:
        "https://blogs.correiobraziliense.com.br/trilhasonora/wp-content/uploads/sites/39/2020/10/CBNFOT081020100047-550x549.jpg",
      answers: {
        "vthrdm985a262al8qx3do": "optionOne",
        "xj352vofupe1dqz9emx13r": "optionTwo",
      },
      questions: ["loxhs1bqm25b708cmbf3g", "vthrdm985a262al8qx3do"],
    },
  },
};

describe("Leaderboard Component", () => {
  it("matches the snapshot", () => {
    const store = mockStore(initialState);
    const { asFragment } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it("orders users correctly by totalScore in descending order", () => {
    const store = mockStore({
      users: {
        user1: {
          id: "user1",
          name: "User One",
          avatarURL: "avatar1.png",
          answers: { question1: "optionOne" },
          questions: ["question2"],
        },
        user2: {
          id: "user2",
          name: "User Two",
          avatarURL: "avatar2.png",
          answers: { question1: "optionOne", question2: "optionTwo" },
          questions: ["question3", "question4"],
        },
      },
    });

    const { getAllByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const names = getAllByText(/User (One|Two)/).map((node) => node.textContent);
    expect(names).toEqual(["User Two", "User One"]); 
  });

  it("renders avatars for all users", () => {
    const store = mockStore({
      users: {
        user1: {
          id: "user1",
          name: "User One",
          avatarURL: "avatar1.png",
          answers: {},
          questions: [],
        },
        user2: {
          id: "user2",
          name: "User Two",
          avatarURL: "avatar2.png",
          answers: {},
          questions: [],
        },
      },
    });

    const { getByAltText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    expect(getByAltText("Avatar of User One").src).toContain("avatar1.png");
    expect(getByAltText("Avatar of User Two").src).toContain("avatar2.png");
  });
  it("renders the correct table headers", () => {
    const store = mockStore(initialState);
  
    const { getByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );
  
    expect(getByText("Avatar")).toBeInTheDocument();
    expect(getByText("Name")).toBeInTheDocument();
    expect(getByText("Answered")).toBeInTheDocument();
    expect(getByText("Created")).toBeInTheDocument();
    expect(getByText("Score")).toBeInTheDocument();
  });
  
  it("renders an empty state when no users are present", () => {
    const store = mockStore({ users: {} });
  
    const { getByText } = render(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );
  
    expect(getByText("Leaderboard")).toBeInTheDocument();
    expect(getByText("No data available")).toBeInTheDocument();
  });
  
});
