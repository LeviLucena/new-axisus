#!/bin/sh
git filter-branch --env-filter '
if [ "$GIT_AUTHOR_NAME" = "gpt-engineer-app[bot]" ]
then
    export GIT_AUTHOR_NAME="Levi Lucena"
    export GIT_AUTHOR_EMAIL="levi@lovable.dev"
fi
if [ "$GIT_COMMITTER_NAME" = "gpt-engineer-app[bot]" ]
then
    export GIT_COMMITTER_NAME="Levi Lucena"
    export GIT_COMMITTER_EMAIL="levi@lovable.dev"
fi
' --tag-name-filter cat -- --branches --tags