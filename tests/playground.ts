import { faker } from "@faker-js/faker";
import { SupaAuth } from "@providers/auth/supabase/supa-auth";

const supa = new SupaAuth();

supa.signUp(faker.internet.email(), faker.internet.password()).then((r) => console.log(r));
