export type User = {
  username: string;
  password: string;
};

const password = process.env.SAUCE_PASSWORD ?? 'secret_sauce';

export const users = {
  standard: { username: 'standard_user', password },
  lockedOut: { username: 'locked_out_user', password },
  problem: { username: 'problem_user', password },
  performanceGlitch: { username: 'performance_glitch_user', password },
} satisfies Record<string, User>;
