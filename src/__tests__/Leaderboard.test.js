/* eslint-disable testing-library/await-async-query */
import React from "react";
import renderer from "react-test-renderer";
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

describe("Leaderboard Tests", () => {
  it("renders correctly with given state", () => {
    const store = mockStore(initialState);

    const component = renderer.create(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  it("displays correct number of users in the leaderboard", () => {
    const store = mockStore(initialState);

    const component = renderer.create(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const instance = component.root;
    const rows = instance.findAllByType("tr"); 
    expect(rows.length).toBe(3); 
  });

  it("orders users by total score descending", () => {
    const store = mockStore(initialState);

    const component = renderer.create(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const instance = component.root;
    const rows = instance.findAllByType("tr").slice(1); 
    const scores = rows.map((row) => {
      const scoreCell = row.findAllByType("td")[4]; 
      return parseInt(scoreCell.children[0]);
    });

    expect(scores).toEqual(scores.sort((a, b) => b - a));
  });

  it("renders user details correctly", () => {
    const store = mockStore(initialState);

    const component = renderer.create(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const instance = component.root;
    const firstUserRow = instance.findAllByType("tr")[1]; 
    const cells = firstUserRow.findAllByType("td");

    expect(cells[1].children[0]).toBe("Sarah Edo"); 
    expect(cells[2].children[0]).toBe("4");
    expect(cells[3].children[0]).toBe("2"); 
    expect(cells[4].children[0]).toBe("6"); 
  });

  it("handles an empty user list gracefully", () => {
    const store = mockStore({ users: {} });

    const component = renderer.create(
      <Provider store={store}>
        <Leaderboard />
      </Provider>
    );

    const instance = component.root;
    const rows = instance.findAllByType("tr");
    expect(rows.length).toBe(1); 
  });
});
